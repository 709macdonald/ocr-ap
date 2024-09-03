// src/OcrComponent.js

import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OcrComponent = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtractText = () => {
    if (image) {
      setLoading(true);
      Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m), // Optional: logs OCR progress
      })
        .then(({ data: { text } }) => {
          setText(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleExtractText} style={{ marginLeft: "10px" }}>
        {loading ? "Extracting..." : "Extract Text"}
      </button>
      <div style={{ marginTop: "20px" }}>
        {image && (
          <img src={image} alt="uploaded" style={{ maxWidth: "300px" }} />
        )}
        {text && (
          <div style={{ marginTop: "20px" }}>
            <h3>Extracted Text:</h3>
            <p>{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OcrComponent;
