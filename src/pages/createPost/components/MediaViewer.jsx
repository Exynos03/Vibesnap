import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../stylesheets/media-viewer.css";
import { Pagination } from "swiper/modules";
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";

const MediaViewer = ({ files, setFiles, setCaption, caption }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1); // Track the current slide index
  const inputRef = useRef(null);

  const handleFileInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);

    // Add only unique files (avoid duplicates)
    const filteredFiles = newFiles.filter(
      (newFile) =>
        !files?.some((existingFile) => existingFile.name === newFile.name),
    );

    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);

    // Generate previews for new unique files
    const newPreviews = filteredFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  return (
    <section className="media-container">
      <div className="media-viewer">
        {!(filePreviews?.length > 0) ? (
          <div className="add-media" onClick={handleFileInputClick}>
            <CiCirclePlus
              size={window.innerWidth > 768 ? 200 : 100}
              color="#00000"
            />
            <p>Add Photo or Video</p>
            <input
              type="file"
              ref={inputRef}
              accept="image/*,video/*"
              multiple
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
        ) : (
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)} // Update index on slide change
          >
            <div className="media-counter">
              <p>
                {currentIndex}/{filePreviews.length}
              </p>
            </div>
            {filePreviews.map((preview, index) => (
              <SwiperSlide key={index}>
                {files[index].type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="img-video"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    autoPlay
                    muted
                    loop
                    className="img-video"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <textarea
        id="example"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add your caption here..."
      />
    </section>
  );
};

export default MediaViewer;
