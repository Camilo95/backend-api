FROM node:19-alpine

# ARGS
ARG WOMPI_PRIVATE_KEY
ARG WOMPI_PUBLIC_KEY

# ENVS
ENV WOMPI_PRIVATE_KEY=${WOMPI_PRIVATE_KEY}
ENV WOMPI_PUBLIC_KEY=${WOMPI_PUBLIC_KEY}

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json"]
ADD ./ /usr/src/app/

RUN npm install

CMD npm run start