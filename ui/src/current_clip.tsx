import { UiState } from "oxygen-core";
import cx from "classnames";
import React, { useState, useEffect } from "react";
import { Pause, Play, Delete } from "./icons";

export default function CurrentClip({ uiState }: { uiState: UiState }) {
  const clip = uiState.currentClip;
  const [temporaryName, setTemporaryName] = useState(clip.name);
  useEffect(() => {
    setTemporaryName(clip.name);
  }, [clip.name]);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row">
        <input
          className="self-center p-2 m-2 text-m font-bold overflow-ellipses overflow-hidden border-2 border-purple-200 rounded-md focus:border-purple-900 outline-purple-900 text-purple-900 flex-grow transition-all"
          value={temporaryName}
          onChange={(ev) => {
            setTemporaryName(ev.currentTarget.value);
          }}
          onBlur={(ev) => {
            const name = temporaryName.trim();
            if (name != "") {
              uiState.renameCurrentClip(name);
            } else {
              setTemporaryName(uiState.currentClip.name);
            }
          }}
        />
        <button
          className="p-2 m-2 ml-0 text-purple-900 cursor-pointer border-2 border-transparent hover:border-red-900 rounded-full hover:bg-red-100 hover:text-red-900"
          title="Delete this clip"
          onClick={(ev) => {
            uiState.deleteCurrentClip();
            ev.preventDefault();
          }}
        >
          <Delete />
        </button>
      </div>
      <div className="flex-grow" />
      <div className="flex flex-row flex-grow">
        <div className="flex-grow" />
        <button
          className={cx(
            "p-4 rounded-md m-auto text-lg flex border-2",
            uiState.streaming
              ? "bg-white border-purple-900 text-purple-900 hover:bg-purple-100"
              : "bg-purple-900 text-white hover:bg-purple-800"
          )}
          onClick={(ev) => {
            ev.preventDefault();
            if (!uiState.streaming) {
              uiState.play(() => {
                uiState.stop();
              });
            } else {
              uiState.stop();
            }
          }}
        >
          {uiState.streaming ? (
            <>
              <Pause />
              <span className="w-2" />
              Pause
            </>
          ) : (
            <>
              <Play />
              <span className="w-2" />
              Play
            </>
          )}
        </button>
        <div className="flex-grow" />
      </div>
      <div className="flex-grow" />
    </div>
  );
}