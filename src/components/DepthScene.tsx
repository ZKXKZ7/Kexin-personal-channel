export function DepthScene() {
  return (
    <div className="depth-scene" aria-hidden="true">
      <div className="depth-floor" />
      <div className="depth-object">
        <div className="depth-orbit depth-orbit--back" />
        <div className="depth-sphere" />
        <div className="depth-orbit depth-orbit--front" />
        <div className="depth-satellite" />
      </div>
    </div>
  );
}
