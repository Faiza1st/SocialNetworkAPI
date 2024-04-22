const {User } = require ('../models');

const controllerUser = {
    async userGet (req, res) {
        try{
            const users = await User.findAll();
            res.statues(200).json(users)
            }catch(err){
                console.log(err);
                res.status(500).json({message: 'Error getting the data'})
            }
        },

    async getOneUser(req, res) {
        try {
            const userData = await User.findByPk({_id: req.params.id})
            .select('-__v')
            .population('friends')

            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
            }
            res.status(200).json(user)
        }
        catch(err) {
            res.status(500).json({err});
            return;
    }
},

async userCreate(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
    },

    async deleteUser (req, res){
        try {
            const user = await User.destroy ({where: { _id: req.params.id} })
            if(!user) {
                res.status(404).json({ message: "No Id found to delete." });
            }
                res.json(user);

            }catch (err) {
                res.status(500).json({ message: `Can not delete user`, err });
              }
            },
        
    

    async userUpdate(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json({ message: 'Can not Update user Id', err });
        }
      }
    }