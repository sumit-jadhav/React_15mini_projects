import React, { useState } from 'react';

const ProductForm = () => {
    const [products, setProducts] = useState([]);
    const [subProducts, setSubProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('solid');
    const [unit, setUnit] = useState(['1kg', '10kg', '200gm', '500gm']);
    const [checkedItems, setCheckedItems] = useState({});

    const handleProductTypeChange = (event) => {
        const selectedType = event.target.value;
        setProductType(selectedType);
        if (selectedType === "solid") {
            setUnit(['1kg', '10kg', '200gm', '500gm']);
        } else {
            setUnit(["1ltr", "2ltr", "500ml"]);
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedSubProducts = Object.keys(checkedItems).filter(key => checkedItems[key]);
        const sub = selectedSubProducts.map(item => productName + item);
        setSubProducts(sub);

        const newProduct = {
            name: productName,
            type: productType,
            subProduct: sub
        };
        setProducts(prevProducts => [newProduct, ...prevProducts]);

        setProductName('');
        setCheckedItems({});
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <h2>Add New Product</h2>
            <div>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    style={{ marginBottom: '10px', marginRight: '10px' }}
                />
            </div>
            <div>
                <label htmlFor="productType">Product Type:</label>
                <select
                    id="productType"
                    value={productType}
                    onChange={handleProductTypeChange}
                    required
                    style={{ marginBottom: '10px', marginRight: '10px' }}
                >
                    <option value="solid">Solid</option>
                    <option value="liquid">Liquid</option>
                </select>
            </div>

            {unit.map((item) => (
                <div key={item} style={{ marginBottom: '10px' }}>
                    <input
                        type='checkbox'
                        name={item}
                        checked={checkedItems[item] || false}
                        onChange={handleCheckboxChange}
                        style={{ marginRight: '5px' }}
                    />
                    <label htmlFor={item}>{item}</label>
                </div>
            ))}

            <button onClick={handleSubmit} style={{ marginTop: '10px', marginRight: '10px' }}>Add Product</button>

            <div>
                {products.length ? (
                    <div>
                        <h3>Added Products:</h3>
                        <table style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Type</th>
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Sub-Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{product.name}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{product.type}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{product.subProduct.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h3>No products added yet.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductForm