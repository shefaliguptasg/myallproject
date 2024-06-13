import { userInfo } from "os";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { showSnackBar } from "utils/snackBarUtils";
import { setLoader } from "redux-store/actions/strapiActions";
import html2canvas from "html2canvas";
import { store } from "../redux-store/store/index";
import canvasToFile from "./canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";

class CommonFunctions {
  static toShortFormat(date: string) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateInstance = new Date(date);
    const day = dateInstance.getDate();

    const monthIndex = dateInstance.getMonth();
    const monthName = monthNames[monthIndex];

    const year = dateInstance.getFullYear();
    return `${day}-${monthName}-${year}`;
  }

  static setItemInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  static getItemFromLocalStorage(key: string) {
    const ldata = localStorage.getItem(key);
    return ldata;
  }

  static getLoggedUserRole() {
    const userRole = localStorage.getItem("userInfo");

    if (userRole) {
      const userInfo = JSON.parse(userRole);
      return userInfo.role.toLowerCase();
    }
  }

  static getLoggedUserName() {
    const userName = localStorage.getItem("userInfo");
    if (userName) {
      const userInfo = JSON.parse(userName);
      return userInfo.first_name;
    }
  }

  static generateTimeOptions() {
    const timeOptions = [];

    for (let hour = 0; hour < 24; hour++) {
      // Format single-digit hours with leading zero
      const formattedHour = hour < 10 ? "0" + hour : hour;

      // Determine AM or PM
      const meridiem = hour < 12 ? "AM" : "PM";

      // Convert hours to 12-hour format
      const formattedHour12 = hour % 12 || 12;

      // Add the formatted time to the array
      let timeObj = {
        label: `${formattedHour12} ${meridiem}`,
        key: `${formattedHour12} ${meridiem}`,
      };
      timeOptions.push(timeObj);
    }

    return timeOptions;
  }

  static formatDateInCustomFormat(dateString: any): string {
    const date = new Date(dateString);
    const day = date.getDate();
    let suffix = "th";

    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];

    return `${day}${suffix} ${month}`;
  }

  static uploadImageFile = async (
    imgRefId: string | Blob,
    imgUrl: string | Blob,
    ref: string,
    field: string,
    handleClose: () => void
  ) => {
    if (typeof imgUrl !== "string") {
      const newData = new FormData();
      newData.append("files", imgUrl);
      newData.append("ref", ref);
      newData.append("refId", imgRefId);
      newData.append("field", field);
      try {
        const imageRes = await axios.post(
          `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
          newData
        );
        if (imageRes.status === 200) {
          showSnackBar("User Added Successfully", "success");
          setTimeout(() => {
            handleClose();
          }, 500);
        }
      } catch (error) {
        showSnackBar("Error Uploading Image", "error");
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    }
  };

  static downloadTemp = async (
    canvasRef: React.RefObject<HTMLDivElement>,
    fileName: string,
    fileFormate: string
  ) => {
    if (!canvasRef.current) {
      console.error("Canvas ref is null");
      return;
    }
    store.dispatch(setLoader(true));
    try {
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
      });

      const croppedCanvas = document.createElement("canvas");
      const croppedCanvasContext = croppedCanvas.getContext("2d");

      if (!croppedCanvasContext) {
        throw new Error("Canvas context not found");
      }

      const cropPositionTop = 0;
      const cropPositionLeft = 0;
      const cropWidth = canvas.width;
      const cropHeight = canvas.height;
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;

      croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

      const link = document.createElement("a");
      link.href = croppedCanvas.toDataURL(`image/${fileFormate}`);
      link.download = `${fileName}.${fileFormate}`;
      link.click();
    } catch (error) {
      console.error("Error while generating canvas: ", error);
    } finally {
      store.dispatch(setLoader(false));
    }
  };

  static sendTemplate = async (
    canvasRef: React.RefObject<HTMLDivElement>,
    fileName: string,
    firleFormate: string
  ) => {
    store.dispatch(setLoader(true));
    try {
      const file = await canvasToFile(
        canvasRef.current,
        fileName,
        firleFormate
      );
      store.dispatch(openEmail(file));
    } catch (error: any) {
      console.log("Error while sending the template. ", error);
      showSnackBar("Error while sending the template. ", error);
    } finally {
      store.dispatch(setLoader(false));
    }
  };
}

export default CommonFunctions;
