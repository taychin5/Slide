const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-gray-200 h-screen w-screen flex items-center justify-center p-6">
        <div
          id="main"
          className="max-h-[1080px] max-w-[480px] bg-white h-full w-full"
        >
          <main className="w-full h-full">{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout
