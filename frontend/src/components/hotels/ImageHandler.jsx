import React, { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import WinError from "./WinError"; // Импортируем компонент для отображения ошибок

export default function ImageHandler({ pics, setPics, maxPics, maxSizeMB, minWidth, maxSumSides, errorAction }) {
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]); // Состояние для хранения ошибок
  let idxFrom = null;

  // Функция для получения метаданных изображения
  const picsMetadata = useCallback(async (file) => {
    const { name } = file;
    const fileExtension = name.split(".").pop();
    const localUrl = URL.createObjectURL(file);

    async function getImageParams(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const image = new Image();
          image.src = e.target.result;
          await image.decode();
          resolve({ width: image.width, height: image.height });
        };
        reader.readAsDataURL(file);
      });
    }

    const { width, height } = await getImageParams(file);
    return { width, height, fileSize: file.size, fileExtension, localUrl };
  }, []);

  // Функция для обработки загруженных изображений
  const handlePicsToArray = useCallback(
    async (e) => {
      const preArray = [...pics];
      const inputArray = Array.from(e.target.files);
      const picsQuantity = preArray.length + inputArray.length;

      if (picsQuantity > maxPics) {
        setErrors([`Не более ${maxPics} картинок!`]);
        return;
      }

      let picsMinus = 0;
      const newErrors = [];

      for (const file of inputArray) {
        const wh = await picsMetadata(file);

        if (wh.width < minWidth) {
          newErrors.push(`Изображение "${file.name}" не добавлено: ширина меньше ${minWidth}px.`);
          picsMinus += 1;
        } else if (wh.width + wh.height > maxSumSides) {
          newErrors.push(`Изображение "${file.name}" не добавлено: сумма длин сторон больше ${maxSumSides}px.`);
          picsMinus += 1;
        } else {
          preArray.push(file);
        }
      }

      if (preArray.length === picsQuantity - picsMinus) {
        let filesSize = 0;
        for (const file of preArray) {
          filesSize += file.size;
        }

        if (Math.floor(filesSize / 1024 / 1024) > maxSizeMB) {
          newErrors.push(`Общий размер файлов больше ${maxSizeMB}МБ.`);
        } else {
          dispatch(setPics(preArray));
        }
      }

      // Устанавливаем ошибки в состояние
      if (newErrors.length > 0) {
        setErrors(newErrors);
      }
    },
    [pics, maxPics, minWidth, maxSumSides, maxSizeMB, picsMetadata, dispatch, setPics]
  );

  // Функция для закрытия ошибки
  const closeError = (index) => {
    setErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Отображение ошибок */}
      {errors.length > 0 && (
        <div className="error-container">
          {errors.map((error, index) => (
            <WinError key={index} onClose={() => closeError(index)}>
              {error}
            </WinError>
          ))}
        </div>
      )}

      {/* Поле для загрузки изображений */}
      <input
        ref={inputFile}
        type="file"
        className="addhotel-input-file"
        multiple
        accept="image/*"
        onChange={handlePicsToArray}
      />
      <div className="addhotel-preview">
        {pics.map((item, index) => (
          <div className="addhotel-div-preview" key={index}>
            <img
              className="addhotel-pics-preview"
              alt="not found"
              src={URL.createObjectURL(item)}
              draggable={true}
              onDragStart={() => (idxFrom = index)}
              onDragOver={(e) => {
                e.preventDefault();
                e.target.style.border = "3px solid red";
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.target.style.border = "3px solid white";
                const tempArray = [...pics];
                tempArray.splice(index, 0, tempArray.splice(idxFrom, 1)[0]);
                dispatch(setPics(tempArray));
              }}
            />
            <div className="close-img-preview" onClick={() => dispatch(setPics(pics.filter((_, arrIdx) => arrIdx !== index)))}>
              &times;
            </div>
          </div>
        ))}
        {pics.length !== maxPics && (
          <button className="addhotel-pics-btn" onClick={() => inputFile.current.click()}>
            <span>+</span>
          </button>
        )}
      </div>
    </>
  );
}