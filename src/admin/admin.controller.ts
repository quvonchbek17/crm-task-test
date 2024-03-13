import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/teacher/dto/login.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Login Teacher' })
  @Post('login')
  loginTeacher(@Body() LoginDto: LoginDto) {
    return this.adminService.loginAdmin(LoginDto);
  }
}
