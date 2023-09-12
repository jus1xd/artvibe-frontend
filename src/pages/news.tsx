import { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import newsUpdateCover from "../assets/img/NewsPost.png";
import newsBugsCover from "../assets/img/news/bugfix.png";
import newsPostCover from "../assets/img/news/postUpdate.png";

import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ProfileNav from "../components/ProfileNav";
import NewsCard from "../components/community/NewsCard";
import ProfileWrapper from "../components/ProfileWrapper";
import { userApi } from "../store/services/userService";
import { IFriend } from "../models/IFriend";
import {
  addFriend,
  deleteFriend,
  setFriends,
} from "../store/slices/friendsSlice";
import { socket } from "../hooks/socket";
import PeopleCard from "../components/PeopleCard";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  setTheme: (theme: string) => void;
};

const News: React.FC<TProps> = ({ setTheme }) => {
  const dispatch = useAppDispatch();
  setTheme("light");
  const [dataFriends, setDataFriends] = useState<IFriend[]>([]);

  // получить токен из localStorage
  const token: string = localStorage.getItem("token") || "";
  // @ts-ignore
  const userId: string = token ? jwt_decode(token).id : "";

  // получить друзей из стора либо запросом
  const [getFriends] = userApi.useGetFriendsMutation();
  const friends = useAppSelector((state) => state.friends.friends);

  // получить данные профиля запросом
  const { data } = userApi.useGetUserByIdQuery(userId);

  // запрос на получение моих друзей
  const [addToFriends] = userApi.useAddToFriendsMutation();
  const [removeFromFriends] = userApi.useRemoveFromFriendsMutation();

  // добавление в друзья WebSocket
  const addToFriendsHandler = (
    setIsFriendLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    addToFriends(dataForFriendsActions).then((res: any) => {
      socket.emit("friendAdded", { userId, peopleId });
      let newFriend = {
        _id: peopleId,
        name: res.data.friendUser.name,
        avatar: res.data.friendUser.avatar,
        messages: [],
      };
      dispatch(addFriend(newFriend));
      setIsFriendLoading(false);
    });
  };

  // удаление из друзей WebSocket
  const removeFromFriendsHandler = (
    setIsFriendLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    removeFromFriends(dataForFriendsActions).then((res: any) => {
      socket.emit("friendRemoved", { userId, peopleId });
      dispatch(deleteFriend(res.data.friendUser));
      setIsFriendLoading(false);
    });
  };

  // получение друзей при загрузке страницы
  useEffect(() => {
    if (data) {
      if (friends.length <= 0) {
        dispatch(setFriends(data.friends));
        setDataFriends(data.friends);
      } else {
        setDataFriends(
          friends.map((friend: any) => {
            return {
              _id: friend._id,
              name: friend.name,
              avatar: friend.avatar,
              messages: [],
              isOnline: friend.isOnline,
            };
          })
        );
      }
      if (friends.length <= 0) {
        getFriends(userId).then((res: any) => {
          dispatch(setFriends(res.data));
        });
      } else {
        setDataFriends(
          friends.map((friend: any) => {
            return {
              _id: friend._id,
              name: friend.name,
              avatar: friend.avatar,
              messages: [],
              isOnline: friend.isOnline,
            };
          })
        );
      }
      setDataFriends(data.friends.filter((item: any) => item._id !== userId));
    }
  }, [data, userId]);

  const news = [
    {
      id: 1,
      photo: newsUpdateCover,
      title: "Встречайте новости",
      text: [
        "Рад представить вам крупное обновление которое приносит множество новых функций и значительное улучшение производительности. Вот некоторые из основных изменений:",
        "1. Новостной блок, который позволит вам быть в курсе последних событий и обновлений в мире ваших друзей. Теперь вы можете легко узнавать о новых постах, фотографиях и событиях в вашей сети прямо с главной страницы.",
        "2. Исправление багов и неполадок, которые могли возникнуть при использовании социальной сети. Теперь вы можете наслаждаться более стабильным и надежным опытом.",
        "3. Улучшение производительности и оптимизация платформы, чтобы обеспечить быструю загрузку страниц и реактивную работу приложения. Это сделает вашу социальную сеть еще более удобной в использовании.",
        "Я всегда стремлюсь улучшать мой продукт, и ваши отзывы играют в этом ключевую роль. Пожалуйста, продолжайте делиться своими идеями и предложениями с мной, чтобы мы могли сделать нашу социальную сеть еще лучше. Спасибо, что выбрали нашу социальную сеть. Мы надеемся, что вам понравятся новые функции и улучшения.",
      ],
      timestamp: "2023-09-03T12:00:00.000Z",
    },
    {
      id: 2,
      photo: newsBugsCover,
      title: "Исправления и улучшения",
      text: [
        "Исправлено несколько ошибок, которые могли возникнуть при использовании социальной сети. Теперь вы можете наслаждаться более стабильным и надежным опытом.",
        "1. Добавлен поиск по диалогам, теперь вы можете быстро найти нужный диалог и перейти к нему.",
        "2. Исправление багов и неполадок, которые могли возникнуть при использовании социальной сети. Теперь вы можете наслаждаться более стабильным и надежным опытом.",
        "3. Исправлены шрифты, теперь они выглядят более четкими и читаемыми.",
        "4. Добавлены уведомления при получении новых сообщений, теперь вы не пропустите важные сообщения.",
        "5. Теперь нельзя создать пустой пост на стене, теперь вы можете быть уверены, что ваши посты всегда будут содержать текст или фотографии.",
        "Я всегда стремлюсь улучшать мой продукт, и ваши отзывы играют в этом ключевую роль. Пожалуйста, продолжайте делиться своими идеями и предложениями с мной, чтобы мы могли сделать нашу социальную сеть еще лучше. Спасибо, что выбрали нашу социальную сеть. Мы надеемся, что вам понравятся новые функции и улучшения.",
      ],
      timestamp: "2023-09-04T00:30:00.000Z",
    },
    {
      id: 3,
      photo: newsBugsCover,
      title: "Исправления и улучшения",
      text: [
        "Исправлено несколько незначительных ошибок, которые могли возникнуть при использовании социальной сети. Теперь вы можете наслаждаться более стабильным и надежным опытом.",
        "Я всегда стремлюсь улучшать мой продукт, и ваши отзывы играют в этом ключевую роль. Пожалуйста, продолжайте делиться своими идеями и предложениями с мной, чтобы мы могли сделать нашу социальную сеть еще лучше. Спасибо, что выбрали нашу социальную сеть. Мы надеемся, что вам понравятся новые функции и улучшения.",
      ],
      timestamp: "2023-09-07T15:00:00.000Z",
    },
    {
      id: 4,
      photo: newsPostCover,
      title: "Обновление постов",
      text: [
        "Рад представить вам крупное обновление которое приносит множество новых функций и значительное улучшение производительности. Вот некоторые из основных изменений:",
        "Теперь вы можете оценивать и комментировать посты на вашей стене и ваших друзей. Также вы можете удалять свои посты.",
        "Теперь багов еще намного больше.",
        "Я всегда стремлюсь улучшать мой продукт, и ваши отзывы играют в этом ключевую роль. Пожалуйста, продолжайте делиться своими идеями и предложениями с мной, чтобы мы могли сделать нашу социальную сеть еще лучше. Спасибо, что выбрали нашу социальную сеть. Мы надеемся, что вам понравятся новые функции и улучшения.",
      ],
      timestamp: "2023-09-08T22:05:00.000Z",
    },
    {
      id: 5,
      photo: newsBugsCover,
      title: "Массивный багфикс",
      text: [
        "Рад представить вам крупное обновление которое приносит множество новых функций и значительное улучшение производительности. Вот некоторые из основных изменений:",
        "1. Переработана система роутинга веб-сервиса. Теперь страницы загружаются намного быстрее и плавнее.",
        "2. Исправлено несколько незначительных ошибок, которые могли возникнуть при использовании социальной сети. Теперь вы можете наслаждаться более стабильным и надежным опытом.",
        "3. Добавлен счетчик пользователей онлайн.",
        "Я всегда стремлюсь улучшать мой продукт, и ваши отзывы играют в этом ключевую роль. Пожалуйста, продолжайте делиться своими идеями и предложениями с мной, чтобы мы могли сделать нашу социальную сеть еще лучше. Спасибо, что выбрали нашу социальную сеть. Мы надеемся, что вам понравятся новые функции и улучшения.",
      ],
      timestamp: "2023-09-12T21:42:00.000Z",
    },
  ];

  return (
    <div className="messenger relative sm:static">
      <Container noBorder>
        <div className="sm:flex mt-10 mb-20 sm:mb-0 sm:mt-10">
          <ProfileNav />
          <ProfileWrapper>
            <div className="baton flex justify-between flex-wrap">
              <div className="">
                {news.reverse().map((item) => {
                  return (
                    <NewsCard
                      key={(Math.random() * 10).toString()}
                      photo={item.photo}
                      title={item.title}
                      text={item.text}
                      timestamp={item.timestamp}
                    />
                  );
                })}
              </div>
              {/* friends  */}
              <div className="relative rounded-xl bg-[#20232B] mb-4 sm:mb-0 p-2 pt-6 pb-[2px] h-max hidden sm:block sm:w-[240px] w-full min-w-[254px] ">
                <div className="z-20 absolute text-[12px] font-bold top-[-8px] left-[-10px] border-[3px] bg-darkBackground rounded-xl border-darkBackground text-accent py-0 px-2">
                  Друзья
                </div>
                <div className="h-[320px] rounded-xl overflow-y-scroll">
                  {dataFriends && dataFriends.length > 0 ? (
                    dataFriends.map((item: IFriend) => (
                      <PeopleCard
                        noMargin
                        key={item._id}
                        dataFriend={item}
                        clientId={userId}
                        isFriend={friends.some(
                          (friend: any) => friend._id === item._id
                        )}
                        addToFriendsHandler={addToFriendsHandler}
                        removeFromFriendsHandler={removeFromFriendsHandler}
                      />
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-[#ffffff80] py-5">
                        У вас пока нет друзей
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ProfileWrapper>
        </div>
      </Container>
    </div>
  );
};

export default News;
