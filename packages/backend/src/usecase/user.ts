import bcrypt from 'bcrypt'
import { UserRepository } from "../repository/user"



export const UserUseCases = {

  login: async ({ emailDto, passwordDto }: { emailDto: string, passwordDto: string }) => {

    try {
      const { _id, name, email, company, password } = await UserRepository.findByEmail(emailDto);
      if (!_id) {
        return new Error('Usuário não encontrado');
      }

      const passwordMatch = bcrypt.compareSync(passwordDto, password);
      if (!passwordMatch) {
        return new Error('Senha ou Email incorretos');
      }

      const token = "12345"

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


}

