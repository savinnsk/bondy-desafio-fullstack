import { UserDto } from '../dtos/user'
import { User } from '../models/User'



export const UserRepository = {
 
  findUserById : async (id : string) : Promise<UserDto> => {
    try{
      const user = await User.findById(id)
  
      return  user
  
    }catch(e : any){
      throw new Error(e.message || e )
    }
  },

  findByEmail : async (email : string) : Promise<UserDto> =>{
    try{
      const user = await User.find({email : email})
  
      return user[0]
      
    }catch(e : any){
      throw new Error(e.message || e )
    }
  },

  createUser : async (data : UserDto) : Promise<UserDto> =>{
    try{
      const user = await User.create({...data})

     return user

    }catch(e : any){
      throw new Error(e.message || e )
    }
  }

}

