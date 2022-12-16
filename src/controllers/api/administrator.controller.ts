import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
       private administratorSrevice: AdministratorService
    ) { }

    @Get()
    getAll(): Promise<Administrator[]> {
        return this.administratorSrevice.getAll();
    }
    @Get(':id')
    getById(@Param('id') administratorId: number): Promise<Administrator> {
        return this.administratorSrevice.getById(administratorId);
    }

    @Put()
    add(@Body() data: AddAdministratorDto){
        return this.administratorSrevice.add(data);
    }
    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator> {
        return this.administratorSrevice.editById(id, data);
    }
}