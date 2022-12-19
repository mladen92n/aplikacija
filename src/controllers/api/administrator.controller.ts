import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { resolve } from "path";

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
     getById(@Param('id') adminstratorId: number): Promise<Administrator | ApiResponse> {
        return new Promise(async (resolve) => {
            let admin = await this.administratorSrevice.getById(adminstratorId);
            if (admin === null) {
                resolve(new ApiResponse("error", -1002));
            }
            resolve(admin);
        });
    }

    @Put()
    add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administratorSrevice.add(data);
    }

    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administratorSrevice.editById(id, data);
    }
}