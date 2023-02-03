import { useNetcode } from "@/controller/netcode";
import { useLocalParticipant } from "@livekit/components-react";
import { Stage } from "@pixi/react";
import { useMemo } from "react";
import useResizeObserver from "use-resize-observer";
import { Character } from "./Character";
import { MyCharacter } from "./MyCharacter";

export function GameView() {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  const { localParticipant } = useLocalParticipant();
  const netcodeData = useNetcode();

  return (
    <div ref={ref} className="relative h-full w-full bg-red-400">
      <Stage
        className="absolute top-0 left-0 bottom-0 right-0"
        raf={true}
        renderOnComponentChange={false}
        width={width}
        height={height}
        options={{ resolution: 2 }}
      >
        {/* We need to pass in the position data here because react will not keep contexts
        across different renderers. See: https://github.com/facebook/react/issues/14101 */}
        <MyCharacter
          username={localParticipant.identity}
          netcode={netcodeData}
        />

        {netcodeData.remotePlayers.map((player) => (
          <Character
            username={player.identity}
            key={player.identity}
            x={player.position.x}
            y={player.position.y}
            animation={player.animation}
          />
        ))}
      </Stage>
    </div>
  );
}
