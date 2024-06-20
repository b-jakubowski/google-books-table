import './App.css'
import { Search } from './components'

function App() {
  return (
    <>
      <Search onSearchClick={(val) => console.log('+++++ val', val)} />
    </>
  )
}

export default App
