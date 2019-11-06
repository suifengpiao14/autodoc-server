FROM node:10
MAINTAINER jess <2912150017@qq.com>
ENV TZ=Asia/Shanghai
RUN apt-get update & apt-get install -y vim telnet
ADD . /var/autodoc_server/

RUN sed -i -n '/LS_OPTIONS=\|alias/s/^#//g' ~/.bashrc
RUN echo "  alias ll='ls -l'">>~/.bashrc

RUN echo "set tabstop=4\nset shiftwidth=4\nset expandtab\nset autoindent\n">>/etc/vim/vimrc.local

EXPOSE 3000
CMD ["node","/var/autodoc_server/bin/server.js"]
