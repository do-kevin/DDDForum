export const OverlaySpinner = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <div style={{ position: "absolute", zIndex: 1, top: 10, right: 10 }}>
      <span className="loading loading-ring loading-md"></span>
    </div>
  ) : (
    ""
  );
