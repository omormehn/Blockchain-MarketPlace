// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Market {
    string public name;
    mapping(uint => Product) public products; // store every attribute of Product in products
    mapping(address => uint[]) public ownedItems;
    uint public countProduct = 0; //store number of products
    uint public ratingCount;
    string[] public allCategories;

    mapping(string => Category) public categories;  
    

    struct Product {
        uint id;
        string name;   
        uint price;
        string description; 
        address payable owner;
        bool purchased;
        uint rating; 
        string category;
    }

    struct Category {
        string name;
        uint[] productIds;
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

    event ProductPurchased (
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );


    constructor() {
        name = "Omormehn";
    }

    //create product
    function createProduct(string memory _name, uint _price, string memory _description, string memory _category) public payable {
        require(bytes(_name).length > 0);
        require(_price > 0, "Price Must be greater than 0");
        countProduct++;

        // Check if the category exists
        if (bytes(categories[_category].name).length == 0) {
            // Create a new category if it doesn't exist
            categories[_category] = Category(_category, new uint[](0));
            allCategories.push(_category);
        }

        products[countProduct] = Product(countProduct, _name, _price, _description, payable(msg.sender), false, 0, _category);
        categories[_category].productIds.push(countProduct);

        ownedItems[msg.sender].push(countProduct);

        emit ProductCreated(countProduct, _name, _price, payable(msg.sender), false, 0, _category);
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](countProduct);
        for (uint256 i = 1; i <= countProduct; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    function getProductsByIds(uint _productId) public view returns (Product memory) {
        require(_productId > 0 && _productId <= countProduct, "Product Does not exist");
        return  products[_productId];
    }

    function buyProducts(uint _id) public payable {
        //get product using id as identifier
        Product memory _product = products[_id];

        address payable _seller = _product.owner;

        require(_product.id > 0 && _product.id <= countProduct, "Item does not exist");

        require(msg.value >= _product.price, "Insufficient amount");

        require(!_product.purchased, "Item sold");

        require(_seller != msg.sender, "You cannot purchase your product!");

        _product.owner = payable(msg.sender);

        _product.purchased = true;

        products[_id] = _product;

        payable(_seller).transfer(msg.value);

        transferOwnership(_id, payable(_seller), msg.sender);
    
        emit ProductPurchased(countProduct, _product.name, _product.price, payable(msg.sender), true);
    }

    function transferOwnership(uint _id, address _from, address _to) internal  {
        Product storage product = products[_id];

        //transfer ownership
        product.owner = payable(_to);

        uint[] storage fromSeller = ownedItems[_from];
        for (uint i = 0; i < fromSeller.length; i++) 
        {
            if (fromSeller[i] == _id) {
                fromSeller[i] = fromSeller[fromSeller.length - 1];
                fromSeller.pop();
                break;
            }
        }

        //add to new owner
        ownedItems[_to].push(_id);

    }

    function transferProduct(uint _id, address _to) public {
        Product storage product = products[_id];
        require(_id > 0 && _id <= countProduct, "Item does not exist");
        require(msg.sender == product.owner, "You are not the owner");

        transferOwnership(_id, msg.sender, _to);
    }

    function getItemsByOwner(address _owner) public view returns (uint[] memory) {
        uint[] memory ownerItems = ownedItems[_owner];
        if (ownerItems.length == 0) {
            return new uint[](0);
        }
        return ownedItems[_owner];
    }

    function rateProduct(uint _id, uint _rating) public {
        Product storage product = products[_id];

    
        require(ownedItems[msg.sender].length > 0, "You must purchase the product to rate it");

        // Update the product's rating
        ratingCount++;
        product.rating = (product.rating * (ratingCount - 1) + _rating) / ratingCount;
    }

    function createCategory(string memory _name) public {
        categories[_name] = Category(_name, new uint[](0));
        allCategories.push(_name);
    }

    function updateCategory(string memory _name, string memory _newName) public {
        Category storage category = categories[_name];
        category.name = _newName;
    }

    function getCategory(string memory _name) public view returns (Category memory) {
        return categories[_name];
    }   

    function getCategories() public view returns (string[] memory) {
        return allCategories;
    }

    function getProductsByCategory(string memory _category) public view returns (uint[] memory) {
        Category storage category = categories[_category];
        return category.productIds;
    }
}

