import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useToggler(defaultValue = false) {
  const [state, setState] = useState(defaultValue);
  const navigate = useNavigate();

  function toggler() {
    setState(!state);
    navigate(-1);
  }

  return { state, toggler };
}