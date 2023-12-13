import { Heart, MyBillNon, BillHeartLike } from '@/assets'
import { MyProfileInfo } from '.'
import { useNavigate } from 'react-router-dom'

export const MyProfileLike = () => {
  const navigate = useNavigate()
  const goToLike = () => {
    navigate('/profile/:id/profilelike')
  }
  const goToMyBill = () => {
    navigate('/profile/:id/profile')
  }
  return (
    <div>
      <MyProfileInfo />
      <div className="pt-24">
        <div className="flex flex-row ml-20">
          <button onClick={goToMyBill}>
            <MyBillNon />
          </button>
          <button className='pl-1' onClick={goToLike}>
            <BillHeartLike />
          </button>
        </div>
        <div className="mx-20 border h-auto flex flex-wrap">
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
          <div className="profileBill bg-white w-162 mb-10 mt-30 ml-45 text-mainBlack text-center profile-bill-background-side">
            <h1 className="text-14">누군가 영수증 #1</h1>{' '}
            {/* 좋아요한 영수증이나 나의 영수증 */}
            <img
              className="bg-mainGray w-124 h-124 mx-19 mt-8"
              src=""
              alt=""
            />
            <div className="flex justify-between border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
              <div>8곡 • 10:38</div>{' '}
              {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
              <button>
                <Heart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
