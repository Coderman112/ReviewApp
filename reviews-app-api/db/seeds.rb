# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Review.create(title: "Django Unchained", content: "Best movie ever made hands down. I will die on this hill")

Comment.create(content: "That is a hot take if ever I've heard one", review_id: 1)