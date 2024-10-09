// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Escrow.sol";

contract Market {
    
    mapping(uint256 => Product) public products; // store every attribute of Product in products
    mapping(address => uint256[]) public ownedItems;
    uint256 public countProduct = 0; //store number of products
    uint256 public ratingCount;
    string[] public allCategories;

    mapping(string => Category) public categories;

    address public escrowContract;

    enum PurchaseStatus {
        Available,
        Pending,
        Delivered
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string description;
        string imageHash;
        address payable owner;
        PurchaseStatus status;
        uint256 rating;
        string category;
        bool isDeleted;
    }

    struct Category {
        string name;
        uint256[] productIds;
    }

    event ProductCreated (
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased,
        uint rating,
        string category
    );


    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event productDelivered(
        uint id,
        string name,
        uint256 price,
        address payable owner
    );

    constructor(address _escrowContract) {
        escrowContract = _escrowContract;
    }

    //create product
    function createProduct(
        string memory _name,
        uint256 _price,
        string memory _description,
        string memory  _imageHash,
        string memory _category
    ) public payable {
        require(bytes(_name).length > 0);
        require(_price > 0, "Price Must be greater than 0");
        countProduct++;

        // Check if the category exists
        if (bytes(categories[_category].name).length == 0) {
            // Create a new category if it doesn't exist
            categories[_category] = Category(_category, new uint256[](0));
            allCategories.push(_category);
        }

        products[countProduct] = Product(
            countProduct,
            _name,
            _price,
            _description,
            _imageHash,
            payable(msg.sender),
            PurchaseStatus.Available,
            0,
            _category,
            false
        );
        categories[_category].productIds.push(countProduct);

        ownedItems[msg.sender].push(countProduct);

        emit ProductCreated(
            countProduct,
            _name,
            _price,
            payable(msg.sender),
            false,
            0,
            _category
        );
    }

    //get All products
   function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](countProduct);
        for (uint256 i = 1; i <= countProduct; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    //get single product
    function getProductsByIds(uint _productId) public view returns (Product memory) {
        require(_productId > 0 && _productId <= countProduct, "Product Does not exist");
        return  products[_productId];
    }

    //delete product
    function deleteProduct(uint _id) public {
        Product storage product = products[_id];
        require(product.id != 0 , "Product does not exist");
        require(product.isDeleted == false, "Product is already deleted");
        require(msg.sender == product.owner, "You are not the owner of this product");

        product.isDeleted = true;
        products[_id] = product;

        // Remove the product from the category
        Category storage category = categories[product.category];
        for (uint i = 0; i < category.productIds.length; i++) {
            if (category.productIds[i] == _id) {
                category.productIds[i] = category.productIds[category.productIds.length - 1];
                category.productIds.pop();
                break;
            }
        }

        // Remove the product from the owner's items
        uint[] storage ownerItems = ownedItems[product.owner];
            for (uint i = 0; i < ownerItems.length; i++) {
            if (ownerItems[i] == _id) {
                ownerItems[i] = ownerItems[ownerItems.length - 1];
                ownerItems.pop();
                break;
            }
        }
    }

    //buy product
    function buyProducts(uint256 _id) public payable {
        //get product using id as identifier
        Product memory _product = products[_id];

        address payable _seller = _product.owner;


        require(
            _product.id > 0 && _product.id <= countProduct,
            "Item does not exist"
        );

        require(msg.value >= _product.price, "Insufficient amount");

        require(_product.status > PurchaseStatus.Pending, "Item sold, in queue");

        require(_seller != msg.sender, "You cannot purchase your product!");

        // Create a new escrow instance
        Escrow escrow = Escrow(escrowContract);
        escrow.deposit{value: msg.value}(_seller);

        _product.status = PurchaseStatus.Pending;
        products[_id] = _product;

        transferOwnership(_id, payable(_seller), msg.sender);

        emit ProductPurchased(
            countProduct,
            _product.name,
            _product.price,
            payable(msg.sender),
            true
        );
    }

    //confirm item has been delivered
    function confirmDelivery(uint256 _id) public {
        Product memory _product = products[_id];
        require(_product.id != 0, "Not a valid delivery"); 

        // Get the escrow instance
        Escrow escrow = Escrow(escrowContract);

        // Confirm the delivery
        escrow.withdraw(_product.owner);

        _product.status = PurchaseStatus.Delivered;
        products[_id] = _product;

        emit productDelivered(
            countProduct,
            _product.name,
            _product.price,
            payable(msg.sender)
        );
    }

    //handle Dispute
    function dispute(uint _id) public {
        // Get the product
        Product memory _product = products[_id];

        // Get the escrow instance
        Escrow escrow = Escrow(escrowContract);

        // Hold the funds until the dispute is resolved
        escrow.holdFunds(_product.owner);
    }

    //resolve dispute
    function resolveDispute(uint _id) public {
        // Get the product
        Product memory _product = products[_id];
        Escrow escrow = Escrow(escrowContract);
        escrow.releaseFunds(_product.owner);
    }

    //transfer ownership
    function transferOwnership(
        uint256 _id,
        address _from,
        address _to
    ) internal {
        Product storage product = products[_id];

        //transfer ownership
        product.owner = payable(_to);

        uint256[] storage fromSeller = ownedItems[_from];
        for (uint256 i = 0; i < fromSeller.length; i++) {
            if (fromSeller[i] == _id) {
                fromSeller[i] = fromSeller[fromSeller.length - 1];
                fromSeller.pop();
                break;
            }
        }

        //add to new owner
        ownedItems[_to].push(_id);
    }

    //sell product
    function transferProduct(uint256 _id, address _to) public {
        Product storage product = products[_id];
        require(_id > 0 && _id <= countProduct, "Item does not exist");
        require(product.isDeleted == false, "Product is already deleted");
        require(msg.sender == product.owner, "You are not the owner");

        transferOwnership(_id, msg.sender, _to);
    }

    //get items by their owners
    function getItemsByOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory ownerItems = ownedItems[_owner];
        if (ownerItems.length == 0) {
            return new uint256[](0);
        }
        return ownedItems[_owner];
    }

    //rate product
    function rateProduct(uint256 _id, uint256 _rating) public {
        Product storage product = products[_id];

        require(
            ownedItems[msg.sender].length > 0,
            "You must purchase the product to rate it"
        );

        // Update the product's rating
        ratingCount++;
        product.rating =
            (product.rating * (ratingCount - 1) + _rating) /
            ratingCount;
    }

    //get category
    function getCategory(string memory _name)
        public
        view
        returns (Category memory)
    {
        return categories[_name];
    }

    //get categories
    function getCategories() public view returns (string[] memory) {
        return allCategories;
    }

    //filter products with categories
    function getProductsByCategory(string memory _category)
        public
        view
        returns (uint256[] memory)
    {
        Category storage category = categories[_category];
        return category.productIds;
    }
}


