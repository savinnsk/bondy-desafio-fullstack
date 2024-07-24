import { UserDto } from '../dtos/user'

const users = [{
    _id : "1",
    name: 'Usuário teste',
    email: 'desafio@bondy.com.br',
    company: 'Desafio Bondy',
    password: "123456"
  }]



export const UserRepository = {
 
  findUserById : (id : string) : UserDto => {
    try{
      const user = users.find(u =>  u._id == id)
  
      return  user
  
    }catch(e : any){
      throw new Error(e.message || e )
    }
  },


  findByEmail : (email : string) : UserDto =>{
    try{
      
     const user = users.find(u =>  u.email == email)
  
     return user
      
    }catch(e : any){
      throw new Error(e.message || e )
    }
  },

  createUser : (data : UserDto) : UserDto =>{
    try{

      data._id = 2

      const user = users.push(data)
      const userCreated = users.find(u =>  u._id == data._id)

     return userCreated

    }catch(e : any){
      throw new Error(e.message || e )
    }
  }

}

