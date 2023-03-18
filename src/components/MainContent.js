import { Search } from "./Search/Search"
import { UsersGrid } from "./UserGrid"
import { UsersList } from "./UsersList"
import {NoUserFound} from './NoUserFound/NoUserFound'
export const MainContent = ({searchQuery, setSearchQuery, isLoading, maleUsers, femaleUsers, filteredUsers, layout}) =>{

    return (
    <>
    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading ={isLoading} maleUsers={maleUsers} femaleUsers={femaleUsers}/>

    {!filteredUsers.length && <NoUserFound/>}

    {layout === "list" ? (<UsersList users={filteredUsers}/>) : (<UsersGrid users={filteredUsers} />)}
    </>
    )
}
