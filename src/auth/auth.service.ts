import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { JWT_SECRET } from './const/auth.const';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ){}
    /**
     * 만들려고 하는기능
     * 1)  registerWithEmail
     *  - email, nickname, password를 입력받고 사용자를 생성한다.
     *  - 생성이 완료되면 accessToken과 refreshToken을 (바로)반환한다.
     *  - 회원가입 후 다시로인해주세요 <- 쓸데없는 과정을 방지 (바로 반환할 수 있게)
     * 2) loginWithEamil
     *  - email, password를 입력하면 사용자 검증을 진행한다.
     *  - 검증이 완료되면 accessToken과 refreshToekn을 반환한다.
     * 
     * 3) loginUser
     *  - (1) 과 (2)에서 필요한 aceessToken과 refreshToken을 반환하는 로직
     * 4) signToken
     *  - (3)에서 필요한 accessToken과 refreshToken을 sign하는 로직
     * 5) authenticateWithEmail
     *  - (2)에서 로그인을 진행할때 필요한 기본적인 검증 진행
     *    1. 사용자가 존재하는지 확인 (email)
     *    2. 비밀번호가 맞는지 확인
     *    3. 모두 통과하면 찾은 사용자 정보 반환
     *    4. loginWithEamil에서 반환된 데이터를 기반으로 토큰 생성
     */
    
    /**
     * Payload에 들어갈 정보 (바로 볼 수 있는 내용)
     * 1) email
     * 2) sub -> id
     * 3) type : 'asccess' | 'refresh'
     */
    signToken(user : Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) { //UserModel에서 email 과 id 값을 가져옵니다.
        const Payload = {
            email: user.email,
            sub: user.id,
            type: isRefreshToken ? 'refresh' : 'access',
        };
        return this.jwtService.sign(Payload, {
            secret: JWT_SECRET,
            //초단위로 만료시간을 정할 수 있습니다.
            expiresIn: isRefreshToken ? 3600 : 300
        })
    }

    loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
        return {
            accessToekn: this.signToken(user, false),
            refreshToken: this.signToken(user, true),
        }
    }
    async authenticateWithEmailAndPassword(user: Pick<UsersModel, 'email'| 'password'>){
        /**
         *  1. 사용자가 존재하는지 확인 (email)
         *  2. 비밀번호가 맞는지 확인
         *  3. 모두 통과하면 찾은 사용자 정보 반환
         */
        const existingUser = await this.usersService.getUserByEmail(user.email);
        if (!existingUser) {
            throw new UnauthorizedException('존재하지 않는 사용자입니다.');
        }
        /**
         * 1)입력된 비밀번호
         * 2) 기존해시 (hash) -> 사용자 정보에 저장돼있는 hash
         */
        const passOk = await bcrypt.compare(user.password, existingUser.password);
        
        if (!passOk) {
            throw new UnauthorizedException('비밀번호가 틀렸습니다.');
        }

        return existingUser;
    }

    async loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>) {
        const existingUser = await this.authenticateWithEmailAndPassword(user);

        return this.loginUser(existingUser);
    }
}
