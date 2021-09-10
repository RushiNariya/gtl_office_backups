package api

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gtldhawalgandhi/go-training/3.Intermediate/db"
	l "github.com/gtldhawalgandhi/go-training/3.Intermediate/logger"
)

func (server *Server) getUsers(ctx *gin.Context) {
	users, err := server.store.GetUsers(ctx)
	fmt.Printf("%+v", err)
	if err != nil {
		l.D(err)
		ctx.JSON(http.StatusInternalServerError, errorResponse(errors.New("failed to get users")))
		return
	}

	ctx.JSON(http.StatusOK, users)
}

func (server *Server) createUser(ctx *gin.Context) {
	var req db.UserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	users, err := server.store.CreateUser(ctx, req)
	fmt.Printf("%+v", err)
	if err != nil {
		l.D(err)
		ctx.JSON(http.StatusInternalServerError, errorResponse(errors.New("failed to create user")))
		return
	}

	ctx.JSON(http.StatusOK, users)
}
