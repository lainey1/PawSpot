# Quick Commands

To do this, first checkout the `dev` branch:

```bash
git checkout dev
```

Then, make sure you have the latest changes in the development branch from
your remote repository in your local repository (this is useful when
collaborating with other developers):

```bash
git pull origin dev
```

Then, merge the feature branch into the `dev` branch:

```bash
git merge auth-setup
```

Finally, push your changes to the development branch to the remote repository:

```bash
git push origin dev
```

## Merge your feature branch into your dev branch

## Sequelize (Object Relationship Mapper)

- npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
- npx sequelize seed:generate --name demo-user

- npx dotenv sequelize db:migrate
- npx dotenv sequelize db:seed:all
- npx dotenv sequelize db:migrate:undo
- npx dotenv sequelize db:seed:undo:all

## Test Data

{
"address": "456 Maple Street",
"city": "Santa Cruz",
"state": "California",
"country": "United States of America",
"lat": 36.974117,
"lng": -89.030796,
"name": "Cozy Cottage",
"description": "A charming getaway nestled in the woods, perfect for relaxation.",
"price": 150
}

{
"url": "https://lifeonshadylane.com/wp-content/uploads/2017/04/5afaf69ab3518909fe575fe8de3d7f3d.jpg",
"preview": true
}
