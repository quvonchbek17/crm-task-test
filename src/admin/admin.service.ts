import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { LoginDto } from 'src/teacher/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async loginAdmin(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.adminModel.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('Username or password is incorrect!');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Username or password is incorrect!');
    }
    const token = this.jwtService.sign(
      { id: user.admin_id, role: Role.ADMIN },
      {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      },
    );
    return {
      username: user.username,
      role: Role.ADMIN,
      token,
    };
  }
}
