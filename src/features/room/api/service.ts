import api from '@/api/axiosConfig';
import { apiRoutes } from '@/api/apiRoutes';
import { CreateRoomForm, createRoomFormSchema } from './create-room';
import z from 'zod';
import { UpdateRoomForm } from './update-room';

export const buildingSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
});

export const buildingArraySchema = z.array(buildingSchema);

export type Building = z.infer<typeof buildingSchema>;

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  floor: z.number(),
  capacity: z.number(),
  status: z.number(),
  building: buildingSchema.optional().nullable(),
});

export const roomArraySchema = z.array(roomSchema);

export type Room = z.infer<typeof roomSchema>;

export default class RoomService {
  static async fetchRooms(): Promise<Room[]> {
    const response = await api.get(apiRoutes.room.buildings);
    return roomArraySchema.parse(response.data);
  }

  static async fetchRoom(roomId: number): Promise<Room> {
    const resonse = await api.get(apiRoutes.room.byId(roomId));
    return roomSchema.parse(resonse.data);
  }

  static async fetchBuildings(): Promise<Building[]> {
    const response = await api.get(apiRoutes.building.base);
    return buildingArraySchema.parse(response.data);
  }

  static async createRoom(data: CreateRoomForm): Promise<CreateRoomForm> {
    const resonse = await api.post(apiRoutes.room.base, data);
    return createRoomFormSchema.parse(resonse.data);
  }

  static async updateRoom({
    roomId,
    data,
  }: {
    roomId: number;
    data: UpdateRoomForm;
  }): Promise<Room> {
    const response = await api.put(apiRoutes.room.byId(roomId), data);
    return roomSchema.parse(response.data);
  }

  static async deleteRoom(roomId: number): Promise<string> {
    const response = await api.delete(apiRoutes.room.byId(roomId));
    return response.data;
  }
}
