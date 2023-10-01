import React, {useState} from "react";
import likeImg from "../img/like.svg";
import closeButton from '../img/close-button.svg';
import productImg from '../img/product-img.png';

const ProductInformationModal = ({ product, onClose }) => {
    const [isLiked, setIsLiked] = useState(false);


  return (
          <div className='modal-overlay'>
               <div className="product-information-modal">
                  <button className="close-button" onClick={onClose}>
                      <img src={closeButton} alt=""/>
                  </button>
                   <div className="product-images">
                       <img src={productImg} alt=""/>
                   </div>
                  {/*<div className="product-images">*/}
                  {/*  {product.images && product.images.length > 0 ? (*/}
                  {/*    product.images.map((image, index) => (*/}
                  {/*      <img key={index} src={image} alt={`Product ${index}`} />*/}
                  {/*    ))*/}
                  {/*  ) : (*/}
                  {/*    <p>No images available</p>*/}
                  {/*  )}*/}
                  {/*</div>*/}
                    <p className='product-information-modal__price'>{product.price} $</p>
                    <h4>{product.name}</h4>
                    <p>The Yeezy 500 Blush is a limited edition shoe designed by Kanye West for Adidas</p>
                      <div className='like-button-block'>
                          <button className={`like-button ${isLiked ? "liked" : ""}`}>
                            <img src={likeImg} alt=""/>
                          </button>
                          <span>Нравится: {product.likes}</span>
                      </div>
                    <h4>Детальное описание</h4>
                    {/*<p>{product.description}</p>*/}
                    <p>It features a unique design, with a chunky silhouette and a blush colorway. The shoe has a mix of suede, mesh and leather, and it's considered a highly sought-after item among shoe enthusiasts.</p>
                </div>
          </div>
  );
};

export default ProductInformationModal;
