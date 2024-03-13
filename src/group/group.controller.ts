import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorators/set-public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Group')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Create new Group' })
  @Roles(Role.ADMIN)
  @Post('create')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Get all Groups' })
  @Roles(Role.ADMIN)
  @Get('all')
  findAllGroups() {
    return this.groupService.findAllGroups();
  }

  @ApiOperation({ summary: 'Get single Group' })
  @Public()
  @Get(':id')
  findOneGroup(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.findOneGroup(id);
  }

  @ApiOperation({ summary: 'Update Group' })
  @Roles(Role.ADMIN)
  @Put(':id')
  updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Delete Group' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  removeGroup(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.removeGroup(id);
  }
}
