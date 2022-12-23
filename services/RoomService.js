class RoomService {
    constructor(db) {
        this.client = db.sequelize;
        this.Room = db.Room;
        this.Reservation = db.Reservation;
    }

    async create(capacity, pricePerDay, hotelId) {
        return this.Room.create(
            {
                Capacity: capacity,
                PricePerDay: pricePerDay, 
                HotelId: hotelId
            }
        ) 
    }
    async get() {
        return this.Room.findAll({
            where: {
            }
        })
    }
    async getHotelRooms(hotelId) {
        return this.Room.findAll({
            where: {
                HotelId: hotelId
            }
        })
    }

    async deleteRoom(roomId) {
        return this.Room.destroy({
            where: {id: roomId}
        })
    }

    async rentARoom(userId, roomId, startDate, endDate) {
        // const rooms = await this.client.query(
        //     'SELECT * FROM Reservations WHERE RoomId = :roomId AND' +
        //     '((StartDate < :startDate AND EndDate > :startDate) OR (StartDate < :endDate AND EndDate > :endDate)' + 
        //     '((StartDate < :startDate AND EndDate > :endDate) OR (StartDate > :startDate AND EndDate < :endDate))',
        //     {
        //       replacements: { 
        //         roomId: roomId,
        //         startDate: startDate,
        //         endDate: endDate
        //     },
        //       type: QueryTypes.SELECT
        // });
        // console.log(rooms);
        return this.Reservation.create(
            {
                RoomId: roomId,
                UserId: userId,
                StartDate: startDate,
                EndDate: endDate
            }
        ).catch(function (err) {
            console.log(err);
        });
    }
}
module.exports = RoomService;