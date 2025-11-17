import { useEffect } from "react";


useEffect(() => {
   console.log("Primera ejecucion")
    return () => {
      // Limpieza del efecto             //(opcional)
    };
  }, [variable]);
  
  
  