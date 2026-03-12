import { Box } from "@mui/material";
import { FC, memo } from "react";
import { MultiVideoPanel } from "./MultiVideoPanel";
import { ReactPlayerVideo } from "./ReactPlayerVideo";
import { FullScreenStateType } from "../../../../types/common";
import { ReplayContainerProps } from "../types";

export const MultiVideoForm: FC<
  ReplayContainerProps &
  { 
    fullScreenProps: FullScreenStateType,
    fullScreenId: string
  }
> = memo(({
    videos, reset, replayFormState, setPlaying, setDuration, setMasterId, setPlayed, setClipRange, fullScreenProps, fullScreenId
}) => {
  const { openFullScreen, closeFullScreen, changeMode, fullScreenState } = fullScreenProps
  const { opened } = fullScreenState

  return (
    <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
      <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
        <Box 
          sx={{ 
            display: "grid", 
            gap: "10px",  
            gridTemplateColumns: videos.length > 5 ? { xs: `repeat(2, 1fr)`, lg: `repeat(4, 2fr)`}: videos.length===1 ? `repeat(1, 1fr)` : `repeat(2, 1fr)`,
            height: "100%", 
            p: "0.5rem",
          }}
        >
        {
          videos.map(({ipv4Addr, nickname, preview, hasFrameDrops, hasUnstableSyncFrames}, index) => (
            <MultiVideoPanel key={ipv4Addr} hasFrameDrops={hasFrameDrops} hasUnstableSyncFrames={hasUnstableSyncFrames} cardTitle={nickname} fullScreen={{ opened, id: fullScreenId, open: openFullScreen, close: closeFullScreen, change: changeMode}}>
              <ReactPlayerVideo 
                id={index} 
                src={preview} 
                state={replayFormState} 
                setPlaying={setPlaying} 
                setDuration={setDuration} 
                setMasterId={setMasterId} 
                setPlayed={setPlayed} 
                setClipRange={setClipRange}
              />
            </MultiVideoPanel>
          ))
        }
        </Box>
      </Box>
    </Box>
  )
})