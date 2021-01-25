/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
const admin = require('firebase-admin')

const db = admin.firestore()

const nameCollection = 'fifaChamptionship'

module.exports = class FifaArenaController {
  async index(req, res) {
    const { year } = req.query
    const files = []
    const snapshots = []
    try {
      const collections = await db.collection(nameCollection).doc(year).listCollections()
      const dates = collections.map((col) => col.id)

      for (const date of dates) {
        snapshots.push(db.collection(nameCollection).doc(year).collection(date).get())
      }

      const results = await Promise.all(snapshots)
      results.forEach((snapshot) => {
        snapshot.forEach((doc) => files.push(doc.data()))
      })

      res.send(files)
    } catch (error) {
      res.send(error)
    }
  }

  async interval(req, res) {
    const { from, to } = req.query
    const files = []
    const snapshots = []
    try {
      const collections = await db.collection(nameCollection).doc(year).listCollections()
      const dates = collections.map((col) => col.id)

      const nitialDateTime = new Date(from).getTime()
      const limiteDateTime = new Date(to).getTime()

      const filteredDates = dates.filter(
        (oldDate) =>
          new Date(oldDate).getTime() <= nitialDateTime &&
          new Date(oldDate).getTime() >= limiteDateTime
      )

      for (const date of filteredDates) {
        snapshots.push(db.collection(nameCollection).doc(year).collection(date).get())
      }

      const results = await Promise.all(snapshots)
      results.forEach((snapshot) => {
        snapshot.forEach((doc) => files.push(doc.data()))
      })

      res.send(files)
    } catch (error) {
      res.send(error)
    }
  }

  async show(req, res) {
    const { date } = req.query
    const files = []
    const year = date.split('.')[0]

    const snapshot = await db.collection(nameCollection).doc(year).collection(date).get()

    if (snapshot.empty) return res.send('No matching document.')

    snapshot.forEach((doc) => {
      files.push(doc.data())
    })

    return res.send(files[0])
  }

  async indexDates(req, res) {
    const { year } = req.query
    try {
      const collections = await db.collection(nameCollection).doc(year).listCollections()
      const collectionIds = collections.map((col) => col.id)

      res.send(collectionIds)
    } catch (error) {
      res.send(error)
    }
  }

  async create(req, res) {
    const { year } = req.query
    const database = req.body

    const updateData = async (year, data) => {
      try {
        const response = await db
          .collection(nameCollection)
          .doc(year)
          .collection(data.date)
          .doc(data.id)
          .set(data)

        res.status(200).send(response)
      } catch (error) {
        throw error
      }
    }

    try {
      database.forEach(async (data) => {
        await updateData(year, data)
      })
    } catch (error) {
      throw error
    }
  }

  async delete(req, res) {
    const deleteCollection = async (db, collectionPath, batchSize) => {
      const deleteQueryBatch = async (db, query, resolve) => {
        const snapshot = await query.get()

        const batchSize = snapshot.size
        if (batchSize === 0) {
          resolve()
          return
        }

        const batch = db.batch()
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref)
        })
        await batch.commit()

        process.nextTick(() => {
          deleteQueryBatch(db, query, resolve)
        })
      }

      try {
        const collectionRef = db.collection(collectionPath)
        const query = collectionRef.orderBy('__name__').limit(batchSize)

        return new Promise((resolve, reject) => {
          deleteQueryBatch(db, query, resolve).catch(reject)
        })
      } catch (error) {
        throw error
      }
    }

    try {
      const { date } = req.query
      const year = date.split('.')[0]
      const path = `/${nameCollection}/${year}/${date}`

      await deleteCollection(db, path, 1)

      res.status(200).send(`Collection "${date}" deleted!`)
    } catch (error) {
      throw error
    }
  }
}
