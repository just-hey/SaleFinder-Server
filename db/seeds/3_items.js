exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { id: 1, name: 'Wild Carrot Herbals Wild Carrot Herbals, Baby Carrot, Botanical Baby Powder', image: 'http://www.moxmultisport.com/wp-content/uploads/no-image.jpg', upc: '853481001703' },

        { id: 2, name: 'CLEAN / DIRTY Star Wars Legos - Dishwasher Magnet. Yoda Vader LEGO Minifigure', image: 'http://az439100.vo.msecnd.net/200/LB1e9bHud0SF8LlG8dWgMw_200.jpg', upc: '655257526379' },

        { id: 3, name: 'Crisp Lavash Chips Crisp Lavash Chips, Potato Chips, Sesame Rosemary', image: 'http://www.moxmultisport.com/wp-content/uploads/no-image.jpg', upc: '032157511139' },

        { id: 4, name: 'Classic Betty Boop Cartoons, Vol. 1', image: 'http://az439100.vo.msecnd.net/200/sHXxQTmdKkuPomPxlWkIKw_200.jpg', upc: '096009184094' },

        { id: 5, name: 'My Best Mathematical And Logic Puzzles (Math & Logic Puzzles)', image: 'http://biqmedia.blob.core.windows.net/200/oSymhpuSwkOwjjkm6IudLQ_200.jpg', upc: '000000000000' },

        { id: 6, name: 'Fleetwood Mac - Fleetwood Mac (LP) (Vinyl)', image: 'http://az439100.vo.msecnd.net/200/uw0M_Pu0Mkqu5AFmI-NZHQ_200.jpg', upc: '075597954319' },

        { id: 7, name: 'Olympia Beer Co Olympia Beer Co, Good Luck, Beer', image: 'https://i.pinimg.com/originals/ab/e1/01/abe1019c3d7ef69eee3629d9783745e3.jpg', upc: '022100075108' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('items_id_seq', (SELECT MAX(id) FROM items));`
      )
    })
}
