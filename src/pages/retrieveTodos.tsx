import { GetServerSideProps } from 'next';
import Home from '@/components/Home';
import { getTodos } from '@/actions/todoActions';
import { todoType } from '@/types/todoType';

interface HomePageProps {
  todos: todoType[];
}

const HomePage = ({ todos }: HomePageProps) => {
  return <Home initialTodos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const todos = await getTodos();
  return {
    props: {
      todos,
    },
  };
};

export default HomePage;
