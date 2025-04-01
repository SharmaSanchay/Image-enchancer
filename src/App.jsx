import Home from './components/Home'

function App() {

  return(
    <>
  <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4'>
     <div className='text-center mb-8'>
      <h1 className='text-5xl font-bold mb-8 text-gray-800'>AI image enhancer</h1>
      <p className='text-lg text-gray-500'>upload your image and let ai enhance to in seconds!! </p>
     </div>
     <Home/>
     <div className='text-sm text-gray-500 mt-6'>
     made by sanchay sharma
     </div>
    </div>
    </>
  );
}

export default App