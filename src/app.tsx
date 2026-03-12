import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const initialize = async () => {
        try {
            setTimeout(() => { 
                if(window.electronAPI) {
                    window.electronAPI.sendReady();
                }
             }, 10000)
        } finally {
            // if(window.electronAPI) {
            //     window.electronAPI.sendReady();
            // }
        }
    }

    initialize()
  },[])

  return (
    <div>
		Hello NAC!
    </div>
  );
}