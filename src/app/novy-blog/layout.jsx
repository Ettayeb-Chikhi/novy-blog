import SearchBar from '../../components/SearchBar';
import NavBar from '../../layout/navbar/NavBar';

const MainLayout = ({ children }) => {
    return (
        <>
            {/*<NavBar />*/}
            <NavBar />
            
            <main>
                <SearchBar />
                {children}

            </main>
        </>
    )
}

export default MainLayout