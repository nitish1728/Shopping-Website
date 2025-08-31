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
    });

    if (!result.isConfirmed) {
      Swal.fire("Cancelled", "Your product is safe!", "info");
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
    setCategory("Clothing");
    setStock("");
    setImage(null);
    setPreview(null);
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  }

  // Placeholder for future update
  function updateProduct(id) {
    Swal.fire("Coming Soon!", `Update feature for Product ID: ${id}`, "info");
  }

  function closeBtn(){
    setShowPage(false)
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
                <th>ProductID</th>
                <th>Name</th>
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
                      <button className="edit" onClick={() => updateProduct(p.id)}>Edit</button>
                      <button className="delete" onClick={() => deleteProduct(p.id)}>Delete</button>
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
        <div className="overlay">
          <div className="form-container">
            <button onClick={() => closeBtn()} id="closeBtn">
              ✖
            </button>
            <h2>Add Product</h2>
            {formerror && (
              <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
                {formerror}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="product-title">
                <label htmlFor="title">Product Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="product-category">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={ category!==''?category:''}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Choose Category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              <div className="product-description">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="product-price">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="product-stock">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="product-image">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
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
                  {formloading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
