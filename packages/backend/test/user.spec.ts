import { UserUseCases } from "../src/usecase/user"; 
import { UserRepository } from "../src/repository/user";
const  bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');


jest.mock('bcrypt', () => ({
  compareSync: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../src/repository/user', () => ({
  UserRepository: {
    findByEmail: jest.fn(),
  },
}));

const userMockLogin = {
  passwordDto: '123456',
  emailDto: 'testmock-desafio@bondy.com.br',
};

describe("userUseCase", () => {
  beforeAll(() => {
    (bcrypt.compareSync as jest.Mock)?.mockReturnValue(true);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (jwt.sign as jest.Mock)?.mockReturnValue('mocktoken');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should be able to login user", async () => {
    
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({
      _id: '123',
      name: 'Test User',
      email: 'testmock-desafio@bondy.com.br',
      company: 'Test Company',
      password: 'hashedpassword'
    });
  
    const result: any = await UserUseCases.login(userMockLogin);

    expect(result.user).toBeDefined();
    expect(result.user).toHaveProperty('email');
    expect(result.user).toHaveProperty('name');
    expect(result.user).toHaveProperty('company');
    expect(result.user.email).toEqual('testmock-desafio@bondy.com.br');
    expect(result.token).toEqual('mocktoken');
  });


  test("should return \"Usuário não encontrado\" when don't find user ", async ()=>{
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({});

    const result: any = await UserUseCases.login(userMockLogin);
    
    expect(result.message).toEqual('Usuário não encontrado');
  })
});
