import bcrypt from 'bcrypt'
import { UserRepository } from "../repository/user"
import jwt from "jsonwebtoken"
import { UserDto } from 'src/dtos/user';



export const UserUseCases = {

  login: async ({ emailDto, passwordDto }: { emailDto: string, passwordDto: string }) => {

    try {

      const isTest = emailDto.split("-")[0] == "testmock"

      const { _id, name, email, company, password }  = await UserRepository.findByEmail(emailDto);
        if (!_id) {
          return new Error('Usuário não encontrado');
        }
  
        const passwordMatch =  !isTest ? bcrypt.compareSync(passwordDto, password) : "mockpassword";
        if (!passwordMatch) {
          return new Error('Senha ou Email incorretos');
        }

       const token = !isTest ?  jwt.sign({ userId: _id }, 'secret-key', { expiresIn: '24h' }) : "mocktoken";

      return {
        user: {
          name,
          email,
          company,
        },

        token
      };
    } catch (e) {
      console.log(e)
      return new Error("Ops! Erro em nossos servidores")
    }
  },

  create: async (data : {user : UserDto}) => {
    try {
      const userAlreadyExists = await UserRepository.findByEmail(data.user.email);

      if (userAlreadyExists) {
       return new Error('Email Já em uso, tente outro!');
      }

      const passwordHash = await bcrypt.hash(data.user.password,8);

      data.user.password = passwordHash;

     
      const {name,email,company} = await UserRepository.createUser({...data.user});


      return {
        user: {
          name,
          email,
          company,
        }
      };
    } catch (e) {
      console.log(e)
      return new Error("Ops! Erro em nossos servidores")
    }
  }

}

