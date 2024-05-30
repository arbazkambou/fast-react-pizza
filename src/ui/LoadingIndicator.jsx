function LoadingIndicator() {
  return (
    <div className=" absolute inset-0 bg-slate-200/10 flex items-center justify-center backdrop-blur-sm z-10">
      <div className="loader"></div>
    </div>
  );
}

export default LoadingIndicator;
