import React, { Component } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import NavBar from './components/Navbar';
import LastItem from './components/LastItem';
import CategoriesBox from './components/CategoriesBox';
import TopBarBoxes from './components/TopBarBoxes';



class App extends Component{

    /* --- Aca arrancamos dandole el estado */
    constructor(props){
        super(props);
        this.state= {
            amount : '',
            quantity: '',
            users: ''
        }
    }

    /* Funcion para llamar a la API, hacemos una func porq vamos a llamar a varias */

    apiCall(url, consecuencia){
        fetch(url)
            .then( response => response.json() )
            .then( data => consecuencia(data) )
            .catch( error => console.log(error))
    }

    /* Esta es la funcion consecuencia de "apiCall()" */

    mostrarProductos = (data)=>{
        console.log(data);
        
       this.setState(
           {
            amount: data.metadata.amount,
            quantity: data.metadata.quantity
        
           }
        ) 
        
        
        
    }
    mostrarUsuarios= (data)=>{
      console.log(data);
      
     this.setState(
         {
          users: data.metadata.quantity,
         }
      ) 
      
      
      
  }

    /* Cuando el componente carga, recien ahi llamamos a la API */
    componentDidMount(){
        console.log("Me monté!!");
        this.traerProductos() 
        this.traerUsuarios()
    }

    /* Aca va la funcion a la q llamamos desde el componentDidMount */
    traerProductos(){
        this.apiCall("http://localhost:3000/apis/products", this.mostrarProductos)
    }
    traerUsuarios(){
      this.apiCall("http://localhost:3000/apis/users", this.mostrarUsuarios)
  }

    render(){
     
        return(
          <body>
          ​
            <div id="wrapper">
          ​
            {/*   <!-- Sidebar --> */}
              <SideBar/>
              {/* <!-- End of Sidebar --> */}
          ​
              {/* <!-- Content Wrapper --> */}
              <div id="content-wrapper" className="d-flex flex-column">
          ​
                {/* <!-- Main Content --> */}
                <div id="content">
          ​
                  {/* <!-- Topbar --> */}
                  <NavBar/>
                  {/* <!-- End of Topbar --> */}
          ​
                  {/* <!-- Begin Page Content --> */}
                  <div className="container-fluid">
          ​
                    {/* <!-- Page Heading --> */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                      <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                    </div>
          ​
                    {/* <!-- Content Row --> */}
                    <div className="row">
                      
                      <TopBarBoxes
                      title = 'PRODUCTS IN DATA BASE'
                      quantity = {this.state.quantity}
                      borderColor = 'border-left-primary'
                      textColor = 'text-primary'/>

                      
                      <TopBarBoxes
                      title = 'AMOUNT IN PRODUCTS'
                      amount= {this.state.amount}
                      borderColor = 'border-left-success'
                      textColor = 'text-success'/>


                      <TopBarBoxes
                      title = 'USERS QUANTITY'
                      users = {this.state.users}
                      borderColor = 'border-left-warning'
                      textColor = 'text-warning '/>


                      {/* <!-- Amount of Products in DB --> 
                      <TopBar
                      text = 'Products in Data base'
                      quantity = '135'
                      borderColor = 'border-left-primary'
                      textColor = 'text-primary'
      
                      />*/}

          ​
                      {/* <!-- $$$ of all products in DB --> 
                      <TopBar
                      text = 'Amount in products'
                      quantity = '$546.456'
                      borderColor = 'border-left-success'
                      textColor = 'text-success'
      
                      />*/}
                   
                      
                      {/* <!-- Amount of users in DB -->
                      <TopBar
                      text = 'Users quantity'
                      quantity = '38'
                      borderColor = 'border-left-warning'
                      textColor = 'text-warning '
      
                      /> */}
                      
                    
                    </div>
          ​
                    {/* <!-- Content Row --> */}
                    <div className="row">
                      {/* <!-- Last Product in DB --> */}
                      <LastItem/>
                      
                     
          ​
                      {/* <!-- Categories in DB --> */}
                     
                      <CategoriesBox/>
                     
                    </div>
                  </div>
                  {/* <!-- /.container-fluid --> */}
                </div>
                {/* <!-- End of Main Content --> */}
          ​
                {/* <!-- Footer --> */}
                <footer className="sticky-footer bg-white">
                  <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                      <span>Copyright &copy; Dashboard 2020</span>
                    </div>
                  </div>
                </footer>
                {/* <!-- End of Footer --> */}
          ​
              </div>
              {/* <!-- End of Content Wrapper --> */}
          ​
            </div>
            {/* <!-- End of Page Wrapper --> */}
          ​
          </body>
        )
}
}

export default App;


