import db from "../../firebase";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Video(props) {
  return (
    <video className={props.cls ? props.cls : ""} src={props.src} autoPlay controls={props.con}>
      {props.children}
    </video>
  );
}
