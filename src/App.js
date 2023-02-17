import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { Battleship } from './pages/Battleship/Battleship'
import { Header } from './components/Header/Header'
import { Catalog } from './pages/Catalog/Catalog'
import { NotFound } from './pages/NotFound/NotFound'
import { Game } from './pages/TicTacToe/TicTacToe'
import Bxnotes from './pages/Bxnotes/Bxnotes'
import { Snake } from './pages/Snake/Snake'
import { useEffect, useState } from 'react'
import { getItem, removeItem, setItem } from '../src/utils/localStorage'
import { AppContext } from './context/appContext'
import { MainForm } from '../src/components/Forms/MainForm'
import { Modal } from '../src/components/Modal/Modal'
import { Heroes } from './pages/Heroes/Heroes'
import { Dino }  from './pages/Dino/Dino'
import PixelArt from './pages/PixelArt/PixelArt'
import { MemoryGame } from './pages/MemoryCard/MemoryCard'
import { Statistics } from './components/Statistics/Statistics'

export function App() {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isLogin, setIsLogin] = useState(false)
   const [currentUser, setCurrentUser] = useState(null)
 
   useEffect(() => {
    const user = getItem('user')
    if (user) {
      setIsLogin(true)
      setCurrentUser(user)
    }
  }, [])

  const handleRegistration = (newUser) => {
    const users = new Map(getItem('users')) || new Map()
    users.set(newUser.email, newUser);
    setItem('users', Array.from(users.entries()))
    handleLogin()
    //TODO обработка случая с зарег. пользователем
  };

  const handleLogin = (user) => {
    const users = new Map(getItem('users')) || new Map()
    const currentUser = users.get(user.email)
    if (currentUser && currentUser.password === user.password) {
      setItem('user', currentUser)
      setIsLogin(true)
      setCurrentUser(currentUser)
      setIsModalOpen(false)
    } else {
      toast('Invalid password or email')
    }
  }

  const handleLogout = () => {
    removeItem('user')
    setCurrentUser(null)
    setIsLogin(false)
  }
   return (
      <AppContext.Provider value={{ isLogin, currentUser }}>
         <Header openModal={setIsModalOpen} logout={handleLogout} />
         <main className="main">
            <Routes>
               <Route path='/' element={<Catalog />} ></Route>
               <Route path="/statistics" element={<Statistics />}></Route>
               <Route path='/game/battleship' element={<Battleship />} ></Route>
               <Route path='/game/tictactoe' element={<Game />} ></Route>
               <Route path='/game/target' element={<Bxnotes />} ></Route>
               <Route path='/game/snake' element={<Snake />} ></Route>
               <Route path="/game/heroes" element={<Heroes />}></Route>
               <Route path="/game/dino" element={<Dino />}></Route>
               <Route path="/game/pixel-art" element={<PixelArt />}></Route>
               <Route path="/game/memory-card" element={<MemoryGame />}></Route>
               <Route path='/game/*' element={<>Эта игра еще в разработке</>} ></Route>
               <Route path='*' element={<NotFound />} ></Route>
            </Routes>
            <ToastContainer />
         </main>
         {isModalOpen && (
            <Modal openModal={setIsModalOpen}>
               <MainForm handleRegistration={handleRegistration} handleLogin={handleLogin} />
            </Modal>
         )}
      </AppContext.Provider>
   )
}