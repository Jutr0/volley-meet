import Navbar from "./navbar/Navbar";

const Layout = ({children}) => {
    return <div className="h-full">
        <Navbar/>
        <div className="flex h-[calc(100%-64px)]">
            <div className="w-[250px] shadow-md flex-shrink-0">
            </div>
            <div className="p-4 flex-grow overflow-auto">
                {children}
            </div>
        </div>
    </div>
}

export default Layout;