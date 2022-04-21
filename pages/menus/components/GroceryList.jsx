import React, {
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

import {
    H3,
    Text,
    Searchbar
} from 'common/components'

import {
  colors,
  FontSizes
} from 'common'
import { IngredientsList } from './IngredientsList';
import { ExtraItems } from './ExtraItems';

export const GroceryList = props => {
  const [items, setItems] = useState([1,2,3,4,]);
  const misc = [{"name":"Misc Item"}, {"name":"Misc Item"}, {"name":"Misc Item"}, {"name":"Misc Item"}];

  useEffect(() => {
    let temp = [];
    props.meal_items && props.meal_items.forEach((meal) => {
      console.log(meal)
      meal.ingredients.forEach((item)=> {
        temp.push(item)
      })
    })
    console.log(temp)
    setItems(temp);
  }, [])

  return (
      <Container>
        <Head>
          <H3
            color={colors.Secondary}
            fontSize={FontSizes.Regular}
          >
              Grocery list
          </H3>
          <Text
            color={colors.grey_dark}
            fontSize={FontSizes.Small}
          >
              Total Items: 8
          </Text>
        </Head>

        {/* <Searchbar
          onSearch={() => {}}
          placeholder="Add Item"
          width="70%"
          height="3rem"
        /> */}

        <IngredientsList 
          name="Main Ingredients"
          data={items}
        />

        <ExtraItems
          name="Extra Items"
          data={misc}
        />

      </Container>
  )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`