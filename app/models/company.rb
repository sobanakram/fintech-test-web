class Company < ApplicationRecord
  validates_length_of :name, minimum: 3
end
