import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./../../css/Modifyproduct.css";

export default function Modifyproduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for Add Product form
  const [showPage, setShowPage] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [formloading, setFormLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formerror, setFormError] = useState("");

  //Update Page
  const [showUpdatepage,setShowUpdatepage]=useState(false);
  const [product, setProduct] = useState([]);

  // Fetch products
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product/fetch");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Delete product
  async function deleteProduct(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      cancelButtonColor:"#DC3545",
      reverseButtons: true
    });

    if (!result.isConfirmed) {
      Swal.fire({
        title:"Cancelled",
        text:"Your product is safe!",
        icon:"info",
      });
      return;
    }

    Swal.fire({
      title: "Deleting...",
      text: "Please wait while we delete the product",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await axios.delete(`http://localhost:3000/product/delete/${id}`);
      Swal.close();
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      getProducts();
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Failed to delete product", "error");
    }
  }

  // Add product
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^[A-Za-z\s]+$/.test(title)) {
      setFormError("Title should only contain letters and spaces.");
      return;
    }
    
    if (isNaN(price) || price <= 0) {
      setFormError("Price must be a valid positive number.");
      return;
    }
    setFormError("");
    setFormLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", image);
    console.log(formData)

    try {
      await axios.post("http://localhost:3000/product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success!", "Product uploaded successfully 🎉", "success");
      getProducts();
      setShowPage(false);
      resetForm();
    } catch (err) {
      Swal.fire("Error!", "Failed to upload product. Try again.", "error");
    } finally {
      setFormLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock("");
    setImage(null);
    setPreview(null);
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  }

  // Placeholder for future update
  async function updateProduct(id) {
    // Swal.fire("Coming Soon!", `Update feature for Product ID: ${id}`, "info");
    setShowPage(true)
    setShowUpdatepage(true)
    try{
      const res = await axios.get(`http://localhost:3000/product/fetch/${id}`);
      setProduct(res.data.products)
    }
    catch(error){
      Swal.fire("Error!", "Failed to update product. Try again.", "error");
    }
  }

  async function handleUpdate(e){
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    const formUpdateData = new FormData();
    if(title)formUpdateData.append("title", title);
    if(price)formUpdateData.append("price", price);
    if(description)formUpdateData.append("description", description);
    if(category)formUpdateData.append("category", category);
    if(stock)formUpdateData.append("stock", stock);
    if(image)formUpdateData.append("image", image);

    console.log(formUpdateData.entries.length)
    try {
      await axios.put(`http://localhost:3000/product/update/${product.id}`, 
      formUpdateData,
    {
       headers: {
      "Content-Type": "multipart/form-data",
      },
    });
      Swal.fire("Success!", `${product.id} updated successfully 🎉`, "success");
      getProducts();
      resetForm();
    } catch (err) {
      Swal.fire("Error!", "Failed to update product. Try again.", "error");
    } finally {
      setShowPage(false);
      setFormLoading(false);
      setShowUpdatepage(false)
    }
  }
  function closeBtn(){
    setShowPage(false)
    setShowUpdatepage(false)
    resetForm()
  }

  return (
    <>
      <button className="add-btn" onClick={() => setShowPage(true)}>
        Add Product
      </button>

      <div className="container">
        {loading && <h3>Loading products...</h3>}
        {error && <h3 style={{ color: "red" }}>{error}</h3>}

        {!loading && products.length > 0 ? (
          <table className="modifytable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.description}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.sold}</td>
                  <td>
                    <div className="actions">
                      <button className="edit" onClick={() => updateProduct(p.id) }>Edit</button>
                      <button className="delete" onClick={() => deleteProduct(p.id)} disabled={showUpdatepage}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <h3>No Products Found</h3>
        )}
      </div>

      {/* Add Product Form */}
      {showPage && (
        
        <div className="overlay" style={{width:showUpdatepage?"90%":"40%"}}>
          {showUpdatepage && (
            <div className="showfields">
              <div className="showfield-details">
                <h2>Current Product Details</h2>
                <img src={product.image} alt={product.title} width="100" height="100" />
                <p><b>ID:</b> {product.id}</p>
                <p><b>Title:</b> {product.title}</p>
                <p><b>Category:</b> {product.category}</p>
                <p><b>Description:</b> {product.description}</p>
                <p><b>Price:</b> ${product.price}</p>
                <p><b>Stock:</b>{product.stock}</p>
              </div>
            </div>
            )
          }
          <div className="form-container" style={{width:showUpdatepage?"50%":"90%"}}>
            <button onClick={() => closeBtn()} id="closeBtn">
              ✖
            </button>
            <h2>{showUpdatepage?"Update":"Add"} Product</h2>
            {formerror && (
              <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
                {formerror}
              </div>
            )}
            <form onSubmit={showUpdatepage?handleUpdate:handleSubmit}>
              <div className="product-title">
                <label htmlFor="title">Product Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required={!showUpdatepage}
                />
              </div>

              <div className="product-category">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={ category!==''?category:''}
                  onChange={(e) => setCategory(e.target.value)}
                  required={!showUpdatepage}
                >
                  <option value="" disabled>Choose Category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Electronics">Electronics</option>
                  required={!showUpdatepage}
                </select>
              </div>

              <div className="product-description">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required={!showUpdatepage}
                />
              </div>

              <div className="product-price">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required={!showUpdatepage}
                />
              </div>

              <div className="product-stock">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required={!showUpdatepage}
                />
              </div>

              <div className="product-image">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!showUpdatepage}
                />
              </div>

              {preview && (
                <div className="image-preview">
                  <p>Image Preview:</p>
                  <img
                    src={preview}
                    alt="preview"
                    width="300"
                    height="200"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

              <div className="submit">
                <input type="reset" value="Reset" onClick={resetForm} />
                <button type="submit" disabled={formloading}>
                  {formloading ? "Loading..." :showUpdatepage?"Update":"Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
